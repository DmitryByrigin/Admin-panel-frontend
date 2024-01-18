# Next.js & NextUI Template

This is a template for creating applications using Next.js 13 (app directory) and NextUI (v2).

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Installation Next
1. Install
```bash
$ git clone https://github.com/DmitryByrigin/Admin-panel-frontend.git
```
2. 
```bash
$ cd Admin-panel-frontend
```
3. 
```bash
$ npm i
```

## Starting project
```bash
$ npm run dev
```

## .env

### NEXTAUTH_URL and NEXTAUTH_SECRET:

1. NEXTAUTH_URL is your app's base URL
2. NEXTAUTH_SECRET - It's a long random string that you can generate yourself. It is used to protect sessions.

### GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:

1. To get these keys, you need to create a project in the Google Cloud Console.
2. Next, you need to enable the Google+ API for your project.
3. After that, you can create OAuth 2.0 credentials that will give you GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.

### QMDB_SECRET:

1. Secret to your DB

## How to use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
