'use client';

import BookForm from '@/components/common/BookForm';
import Header from '../_components/Header';

export default function NewBookPage() {
  return (
    <div>
      <Header backButton={true} />
      <BookForm mode="create" />
    </div>
  );
}
