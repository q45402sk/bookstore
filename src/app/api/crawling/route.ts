import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import axios from 'axios';

interface IBookInfo {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  summary: string;
  count: number;
  price: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST() {
  try {
    const browser = await puppeteer.launch();
    const backendResponses = [];

    const crawlingList = async () => {
      const page = await browser.newPage();
      let books: IBookInfo[] = [];
      try {
        for (let i = 1; i < 11; i++) {
          await page.goto(
            `https://store.kyobobook.co.kr/bestseller/total/annual?page=${i}`,
            {
              waitUntil: 'networkidle2', // 네트워크 요청이 거의 없는 상태까지 대기
              timeout: 60000, // 타임아웃 설정 (60초)
            }
          );
          await page.setViewport({ width: 1080, height: 1024 });
          const pageBooks = await page.evaluate(() => {
            const bookElements = document.querySelectorAll('.items-top');
            const data: IBookInfo[] = [];

            bookElements.forEach((el, index) => {
              const link =
                el
                  .querySelector('a.prod_link.font-text-xl')
                  ?.getAttribute('href') || '';
              const idMatch = link.match(/S(\d+)$/);
              const id = idMatch ? parseInt(idMatch[1], 10) : index + 1; // ID가 없으면 index 사용
              const title =
                el
                  .querySelector('a.prod_link.font-text-xl')
                  ?.textContent?.trim() || '제목 없음';
              const author =
                el
                  .querySelector('a.prod_link.font-text-xl')
                  ?.nextElementSibling?.textContent?.trim() || '저자 없음';

              const thumbnailElement = el.querySelector('a.prod_link img');
              const thumbnail = thumbnailElement
                ? thumbnailElement.getAttribute('src') || ''
                : '';
              const summary =
                el.querySelector('.prod_introduction')?.textContent?.trim() ||
                '설명 없음';

              const priceElement = el.querySelector(
                '.inline-block.align-top.font-text-xl'
              )?.nextElementSibling;
              const priceText =
                priceElement?.textContent?.replace(/\D/g, '') || '0'; // 숫자만 남김

              data.push({
                id,
                title,
                author,
                thumbnail,
                summary,
                price: parseInt(priceText, 10),
                count: 0,
              });
            });

            return data;
          });

          books = [...books, ...pageBooks];
        }
      } finally {
        await page.close();
      }
      return books;
    };

    const BookList = await crawlingList();
    for (const result of BookList) {
      try {
        const backendResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
          result,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Version': 1,
            },
          }
        );
        backendResponses.push(backendResponse.data);
        console.log(backendResponse.data);
      } catch (error) {
        console.log('보내기 실패: ', error);
        return;
      }
    }

    await delay(1000);

    await browser.close();

    return NextResponse.json({
      message: 'Crawling and data transfer successful',
      // backendResponse: backendResponse.data,
      backendResponse: backendResponses,
    });
  } catch (error) {
    console.error('Error during crawling or data transfer:', error);
    return NextResponse.json(
      { error: 'Crawling or data transfer failed' },
      { status: 500 }
    );
  }
}
