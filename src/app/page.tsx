import Footer from './_components/Footer';

export default function Home() {
  return (
    <div>
      테스트
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
