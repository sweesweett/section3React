import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
const Todoli = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin: auto;
  width: 800px;
  height: 120px;
  border: 1px solid #0909092b;
  border-radius: 5px;
  position: relative;
  .contents {
    display: flex;
    flex-direction: column;
    .date {
      position: relative;
      ::after {
        content: '';
        position: absolute;
        width: 100px;
        height: 20px;
        background-color: #0909092b;
        left: 0;
        top: 0;
      }
    }
  }
  .editNdelete {
    align-self: flex-end;
    span:last-child {
      margin-left: 10px;
    }
  }
`;

const Todo = ({ el, setToDoData }) => {
  let title = useRef();
  let content = useRef();
  const [isOpened, setIsOpened] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await axios
        .delete(`http://localhost:4000/todo/${id}`)
        .then(({ data }) => {
          setToDoData([...data]);
          alert('완벽하게 삭제되었답니다!');
        })
        .catch((err) => alert('삭제하지 못했어요! 다시시도해주세요'));
    } else {
      return;
    }
  };
  const handleEdit = async (data) => {
    if (window.confirm('수정하시겠습니까?')) {
      let newData = {
        ...data,
        title: title.current.value,
        content: content.current.value,
      };

      await axios
        .put(`http://localhost:4000/todo/`, newData)
        .then(({ data }) => {
          console.log(data);
          setToDoData(data);
          alert('완벽하게 수정되었답니다!');
          setIsOpened(!isOpened);
        })
        .catch((err) => alert('수정하지 못했어요! 다시시도해주세요'));
    }
  };
  return (
    <>
      <Todoli>
        {isOpened === false ? (
          <>
            <div className='editNdelete'>
              <span onClick={() => setIsOpened(!isOpened)}>수정</span>
              <span onClick={() => handleDelete(el.id)}>삭제</span>
            </div>
            <div className='contents'>
              <span className='date'>
                {new Date(el.createdAt).toLocaleString('ko-KR').slice(0, 11)}
              </span>
              <span>{el.memo}</span>
              <p>
                <a href={el.likeContent.link} target='_blank' rel='noreferrer'>
                  {el.likeContent.title
                    .replaceAll('<b>', '')
                    .replaceAll('</b>', '')
                    .replaceAll('&quot;', '')
                    .replaceAll('&apos;', '')}
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className='editNdelete'>
              <span onClick={() => handleEdit(el)}>수정</span>
              <span onClick={() => setIsOpened(!isOpened)}>취소</span>
            </div>

            <input ref={title} type='text' defaultValue={el.title} />
            <textarea
              ref={content}
              name=''
              id=''
              cols='30'
              rows='10'
              defaultValue={el.content}
            />
          </>
        )}
      </Todoli>
    </>
  );
};
export default Todo;
