import Image from 'next/image';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div>
      테스트
      <Image
        src="https://store.kyobobook.co.kr/_next/image?url=https%3A%2F%2Fcontents.kyobobook.co.kr%2Fsih%2Ffit-in%2F144x222%2Fpdt%2F9791191214185.jpg&w=3840&q=80"
        alt="test"
        width={144}
        height={222}
      />
      <Footer
        totalPages={17}
        books={[
          { id: 1, title: 'apple' },
          { id: 1, title: 'banana' },
        ]}
      />
    </div>
  );
}
