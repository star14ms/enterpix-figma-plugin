import { useState } from 'react';
import { ImageData } from '../../shared';
import { PlatformParams } from '../../shared/api';
import { requestText2Img } from '../api';
import { makePlatformAPIArg } from '../lib/utils';


const imgsApple = [
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/5b60306c-c427-4873-ac15-ff4c7e880899/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/5b60306c-c427-4873-ac15-ff4c7e880899/compressed",
    height: 1024,
    id: "5b60306c-c427-4873-ac15-ff4c7e880899",
    thumbnailUrl: "https://cdn.enterpix.app/images/5b60306c-c427-4873-ac15-ff4c7e880899/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/5c372f9d-1d79-4a16-bd49-3c02b16a7126/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/5c372f9d-1d79-4a16-bd49-3c02b16a7126/compressed",
    height: 2048,
    id: "5c372f9d-1d79-4a16-bd49-3c02b16a7126",
    thumbnailUrl: "https://cdn.enterpix.app/images/5c372f9d-1d79-4a16-bd49-3c02b16a7126/thumbnail",
    width: 2048,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/6094a2c6-bb52-47f5-8199-762ff2dbb877/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/6094a2c6-bb52-47f5-8199-762ff2dbb877/compressed",
    height: 1024,
    id: "6094a2c6-bb52-47f5-8199-762ff2dbb877",
    thumbnailUrl: "https://cdn.enterpix.app/images/6094a2c6-bb52-47f5-8199-762ff2dbb877/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/6122e495-e566-4662-9f09-e6c220115cdd/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/6122e495-e566-4662-9f09-e6c220115cdd/compressed",
    height: 1024,
    id: "6122e495-e566-4662-9f09-e6c220115cdd",
    thumbnailUrl: "https://cdn.enterpix.app/images/6122e495-e566-4662-9f09-e6c220115cdd/thumbnail",
    width: 1792,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/6b6f15b4-4a22-40cb-82e2-9543499535f9/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/6b6f15b4-4a22-40cb-82e2-9543499535f9/compressed",
    height: 512,
    id: "6b6f15b4-4a22-40cb-82e2-9543499535f9",
    thumbnailUrl: "https://cdn.enterpix.app/images/6b6f15b4-4a22-40cb-82e2-9543499535f9/thumbnail",
    width: 512,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/8b001f67-564f-4323-9db5-255d3e63f830/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/8b001f67-564f-4323-9db5-255d3e63f830/compressed",
    height: 1024,
    id: "8b001f67-564f-4323-9db5-255d3e63f830",
    thumbnailUrl: "https://cdn.enterpix.app/images/8b001f67-564f-4323-9db5-255d3e63f830/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/92cec585-e1cb-4489-9727-46875f469c07/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/92cec585-e1cb-4489-9727-46875f469c07/compressed",
    height: 1024,
    id: "92cec585-e1cb-4489-9727-46875f469c07",
    thumbnailUrl: "https://cdn.enterpix.app/images/92cec585-e1cb-4489-9727-46875f469c07/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/c76c7498-238b-4a5f-bc40-ebef1a0ea3d9/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/c76c7498-238b-4a5f-bc40-ebef1a0ea3d9/compressed",
    height: 1664,
    id: "c76c7498-238b-4a5f-bc40-ebef1a0ea3d9",
    thumbnailUrl: "https://cdn.enterpix.app/images/c76c7498-238b-4a5f-bc40-ebef1a0ea3d9/thumbnail",
    width: 1664,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/fa93be57-cfb0-4037-8ca3-c8fa83a96286/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/fa93be57-cfb0-4037-8ca3-c8fa83a96286/compressed",
    height: 1024,
    id: "fa93be57-cfb0-4037-8ca3-c8fa83a96286",
    thumbnailUrl: "https://cdn.enterpix.app/images/fa93be57-cfb0-4037-8ca3-c8fa83a96286/thumbnail",
    width: 1024,
  }
]

const imgsSpace = [
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/031847b2-744d-4ee5-a242-b89f43429399/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/031847b2-744d-4ee5-a242-b89f43429399/compressed",
    height: 2432,
    id: "031847b2-744d-4ee5-a242-b89f43429399",
    thumbnailUrl: "https://cdn.enterpix.app/images/031847b2-744d-4ee5-a242-b89f43429399/thumbnail",
    width: 1664,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/03981823-e485-402f-807a-d846178f0046/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/03981823-e485-402f-807a-d846178f0046/compressed",
    height: 640,
    id: "03981823-e485-402f-807a-d846178f0046",
    thumbnailUrl: "https://cdn.enterpix.app/images/03981823-e485-402f-807a-d846178f0046/thumbnail",
    width: 512,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/3a9f5bc3-4055-4c10-b163-2b8210c7bd38/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/3a9f5bc3-4055-4c10-b163-2b8210c7bd38/compressed",
    height: 1024,
    id: "3a9f5bc3-4055-4c10-b163-2b8210c7bd38",
    thumbnailUrl: "https://cdn.enterpix.app/images/3a9f5bc3-4055-4c10-b163-2b8210c7bd38/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/589fcd43-b17d-4711-a54f-0a3017eab05d/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/589fcd43-b17d-4711-a54f-0a3017eab05d/compressed",
    height: 2304,
    id: "589fcd43-b17d-4711-a54f-0a3017eab05d",
    thumbnailUrl: "https://cdn.enterpix.app/images/589fcd43-b17d-4711-a54f-0a3017eab05d/thumbnail",
    width: 1664,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/62ab94db-36ce-4087-9232-c0ce81b3a767/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/62ab94db-36ce-4087-9232-c0ce81b3a767/compressed",
    height: 2304,
    id: "62ab94db-36ce-4087-9232-c0ce81b3a767",
    thumbnailUrl: "https://cdn.enterpix.app/images/62ab94db-36ce-4087-9232-c0ce81b3a767/thumbnail",
    width: 1664,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/7acdaf71-84b6-4a60-92db-590e3649d24f/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/7acdaf71-84b6-4a60-92db-590e3649d24f/compressed",
    height: 1280,
    id: "7acdaf71-84b6-4a60-92db-590e3649d24f",
    thumbnailUrl: "https://cdn.enterpix.app/images/7acdaf71-84b6-4a60-92db-590e3649d24f/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/c1a37ece-dc3b-4c46-81ea-c7fc99e0d23e/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/c1a37ece-dc3b-4c46-81ea-c7fc99e0d23e/compressed",
    height: 1280,
    id: "c1a37ece-dc3b-4c46-81ea-c7fc99e0d23e",
    thumbnailUrl: "https://cdn.enterpix.app/images/c1a37ece-dc3b-4c46-81ea-c7fc99e0d23e/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/d4fc476d-3fb3-4ff4-9225-2fc432e25ae4/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/d4fc476d-3fb3-4ff4-9225-2fc432e25ae4/compressed",
    height: 1280,
    id: "d4fc476d-3fb3-4ff4-9225-2fc432e25ae4",
    thumbnailUrl: "https://cdn.enterpix.app/images/d4fc476d-3fb3-4ff4-9225-2fc432e25ae4/thumbnail",
    width: 1024,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/fe951704-719f-4bfc-b413-a00106f5383d/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/fe951704-719f-4bfc-b413-a00106f5383d/compressed",
    height: 1792,
    id: "fe951704-719f-4bfc-b413-a00106f5383d",
    thumbnailUrl: "https://cdn.enterpix.app/images/fe951704-719f-4bfc-b413-a00106f5383d/thumbnail",
    width: 1152,
  },
  {
    bigThumbnailUrl: "https://cdn.enterpix.app/images/fea1b969-d93f-4ce2-b944-7f07e2e7ca14/big-thumbnail",
    compressedUrl: "https://cdn.enterpix.app/images/fea1b969-d93f-4ce2-b944-7f07e2e7ca14/compressed",
    height: 1536,
    id: "fea1b969-d93f-4ce2-b944-7f07e2e7ca14",
    thumbnailUrl: "https://cdn.enterpix.app/images/fea1b969-d93f-4ce2-b944-7f07e2e7ca14/thumbnail",
    width: 1024,
  },
]


function useText2Img() {
  const startInit = Math.floor(Math.random() * 1000)
  const [start, setStart] = useState(startInit);
  const length = 20

  const getText2Img = async (prompt: string, platformParmas: PlatformParams) => {
    const platform = makePlatformAPIArg(platformParmas)
    const json = await requestText2Img({ prompt, start, length, platform }) as ImageData[] | null;

    setStart(start => (start + length) % 1000)
    return json;
  };

  return getText2Img;
}

export default useText2Img;
