'use client';

import { firebaseConfig } from '@/lib';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const stroage = getStorage(app, 'gs://blog-app-97d34.appspot.com');

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const stroageRef = ref(stroage, `blog/${extractUniqueFileName}`);
  const uploadImg = uploadBytesResumable(stroageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      'state_changed',
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      },
    );
  });
}

async function handleBlogImageChange(event: React.ChangeEvent<HTMLInputElement>) {
  if (!event.target.files) return;
  setImageLoading(true);
  const saveImageToFirebase: any = await handleImageSaveToFireBase(event.target.files[0]);

  if (saveImageToFirebase !== '') {
    setImageLoading(false);
    console.log(saveImageToFirebase, 'saveImageToFirebase');
    // setFormData({
    //   ...formData,
    //   image: saveImageToFirebase,
    // });
  }
}
function setImageLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

async function handleSaveBlogPost() {
  const res = await fetch('/api/blog-post/add-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //   body: JSON.stringify({
    //     ...formData,
    //     userid: session?.user?.name,
    //     userimage: session?.user?.image,
    //     comments: [],
    //   }),
  });

  const data = await res.json();

  console.log(data, 'data123');

  // if (data && data.success) {
  //   setFormData(initialBlogFormData)
  //   router.push("/blogs");
  // }
}
