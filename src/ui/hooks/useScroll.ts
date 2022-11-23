import { useState, useEffect } from "react";


export default function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)

  // TODO - resize 시 고려
  const body = document.getElementsByTagName('body')[0]

  const listener = () => {
    setScrollY(window.pageYOffset);
    setIsScrollBottom(body.scrollHeight <= body.scrollTop + body.clientHeight) 
  };
  
  // TODO - 메모리 누수 여부 확인
  // https://velog.io/@taeung/React-Custom-Hooks%EB%A1%9C-Scroll-Event-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0#%EC%B6%94%EA%B0%80
  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    isScrollBottom,
  };
}