import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import Image from 'next/image';

// 사용 예시
// useModal을 사용하여 생성한 modalOpen과 handleModalClose를 Modal 컴포넌트의 Props로 내려줍니다.
// function Page() {
//   const { modalOpen, handleModalOpen, handleModalClose } = useModal();
//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         height: '100vh',
//         zIndex: '1',
//       }}>
//       <button type="button" onClick={handleModalOpen}>
//         모달 클릭
//       </button>
//       <Modal modalOpen={modalOpen} onClose={handleModalClose} maxWidth={300}>모달 내용</Modal>
//     </div>
//   );
// }

interface IModalProps {
  modalOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
  xButton?: boolean;
  children: ReactNode | undefined;
}

export default function Modal({
  modalOpen,
  onClose,
  maxWidth = 300,
  xButton = false,
  children,
}: IModalProps) {
  return (
    <>
      <div
        onMouseDown={onClose}
        className={modalOpen ? styles.modalBackground : ''}>
        <div
          onMouseDown={e => {
            e.stopPropagation();
          }}
          onClick={e => {
            e.stopPropagation();
          }}
          className={`${styles.modalWithXButton}`}
          style={{
            width: `min(${maxWidth}px, 70%)`,
          }}>
          <div
            className={`${modalOpen ? styles.modal : styles.none}`}
            style={{
              width: '100%',
            }}>
            {children}
          </div>
          {xButton && modalOpen && (
            <button type="button" onClick={onClose} className={styles.xButton}>
              <Image
                src={'/assets/icons/x-button.svg'}
                alt={'닫기 버튼'}
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
