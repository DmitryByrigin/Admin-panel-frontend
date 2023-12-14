// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Image,
//   Input,
//   Textarea,
//   Button,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from '@nextui-org/react';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { GlobalContext } from '@/app/providers';
// import { firebaseConfig, initialBlogFormData } from '@/lib';
// import { initializeApp } from 'firebase/app';
//
// // import router from 'next/router';
// import { auth } from '@/auth';
//
// function createUniqueFileName(fileName: string) {
//   const timeStamp = Date.now();
//   const randomString = Math.random().toString(36).substring(2, 12);
//
//   return `${fileName}-${timeStamp}-${randomString}`;
// }
//
// const app = initializeApp(firebaseConfig);
// const stroage = getStorage(app, 'gs://best-admin-panel.appspot.com');
//
// async function handleImageSaveToFireBase(file: any) {
//   const extractUniqueFileName = createUniqueFileName(file?.name);
//   const stroageRef = ref(stroage, `blog/${extractUniqueFileName}`);
//   const uploadImg = uploadBytesResumable(stroageRef, file);
//
//   return new Promise((resolve, reject) => {
//     uploadImg.on(
//       'state_changed',
//       (snapshot) => {},
//       (error) => reject(error),
//       () => {
//         getDownloadURL(uploadImg.snapshot.ref)
//           .then((url) => resolve(url))
//           .catch((error) => reject(error));
//       },
//     );
//   });
// }
//
// export default async function BlogPage() {
//   const session = await auth();
//
//   // async function handleBlogImageChange(event: React.ChangeEvent<HTMLInputElement>) {
//   //   if (!event.target.files) return;
//   //   // setImageLoading(true);
//   //   const saveImageToFirebase: any = await handleImageSaveToFireBase(event.target.files[0]);
//
//   //   if (saveImageToFirebase !== '') {
//   //     setImageLoading(false);
//   //     console.log(saveImageToFirebase, 'saveImageToFirebase');
//   //     setFormData({
//   //       ...formData,
//   //       image: saveImageToFirebase,
//   //     });
//   //   }
//   // }
//
//   async function handleSaveBlogPost() {
//     // console.log(formData);
//
//     const res = await fetch('/api/blog-post/add-post', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         // ...formData,
//         userid: session?.user?.name,
//         userimage: session?.user?.image,
//         comments: [],
//       }),
//     });
//
//     const data = await res.json();
//
//     console.log(data, 'data123');
//
//     if (data && data.success) {
//       // setFormData(initialBlogFormData);
//       // router.push('/blogs');
//     }
//   }
//   return (
//     <>
//       <h1 className="text-2xl font-bold pb-3 pl-3">Blog</h1>
//       <Card
//         isBlurred
//         className="border-none bg-background/60 dark:bg-default-100/50 mx-3"
//         shadow="sm">
//         <CardBody>
//           <div className="flex flex-col gap-6 md:gap-4 justify-center items-stretch">
//             {/* <div className="relative col-span-6 md:col-span-4">
//               <Image
//                 alt="Album cover"
//                 className="object-cove"
//                 height={200}
//                 shadow="md"
//                 src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
//                 width="100%"
//               />
//             </div> */}
//
//             <section className="flex mx-3">
//               <article className="w-full">
//                 <Input
//                   id="fileinput"
//                   accept="image/*"
//                   type="file"
//                   max={10000000}
//                   label="Upload blog image"
//                   name="file"
//                   placeholder="No file chosen"
//                   labelPlacement="outside"
//                 />
//               </article>
//             </section>
//             <section className="flex mx-3">
//               <article className="w-full">
//                 <Input
//                   type="title"
//                   label="Title"
//                   name="title"
//                   placeholder="Enter blog title"
//                   labelPlacement="outside"
//                 />
//               </article>
//             </section>
//             <section className="flex mx-3">
//               <article className="w-full">
//                 <Textarea
//                   isInvalid={true}
//                   variant="bordered"
//                   labelPlacement="outside"
//                   label="Description"
//                   placeholder="Enter your description"
//                   defaultValue="NextUI is a React UI library with..."
//                   errorMessage="The description should be at least 255 characters long."
//                   className="max-w-xs"
//                 />
//               </article>
//             </section>
//           </div>
//           <div className="flex flex-col items-start">
//             {/* <Dropdown>
//               <DropdownTrigger>
//                 <Button variant="bordered" className="capitalize">
//                   {selectedValue}
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Multiple selection example"
//                 variant="flat"
//                 closeOnSelect={false}
//                 disallowEmptySelection
//                 selectionMode="multiple"
//                 selectedKeys={selectedKeys}
//                 onSelectionChange={setSelectedKeys}>
//                 <DropdownItem key="text">Text</DropdownItem>
//                 <DropdownItem key="number">Number</DropdownItem>
//                 <DropdownItem key="date">Date</DropdownItem>
//                 <DropdownItem key="single_date">Single Date</DropdownItem>
//                 <DropdownItem key="iteration">Iteration</DropdownItem>
//               </DropdownMenu>
//             </Dropdown> */}
//             <Button
//               // onClick={handleSaveBlogPost}
//               type="submit"
//               className="text-sm font-normal text-default-600 bg-default-100 p-6"
//               variant="flat">
//               Login
//             </Button>
//           </div>
//         </CardBody>
//       </Card>
//     </>
//   );
// }
