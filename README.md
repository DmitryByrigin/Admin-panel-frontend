# The production branch is not ready yet, so it is necessary to move to the development branch

# Next.js & NextUI Template

This is a template of blog for creating applications using Next.js 14 (app directory), NextAuth and NextUI (v2).

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth](https://next-auth.js.org/)

## Installation of project
1. Download from repository
```bash
$ git clone https://github.com/DmitryByrigin/Admin-panel-frontend.git
```
2. Go to the root folder of the project
```bash
$ cd Admin-panel-frontend
```
3. Install all dependencies
```bash
$ npm i
```

## Important information

### In the Contents.ts file, the lib folder, there should be a locale host on which the backend is running

## Starting project
```bash
# This command is used to start a development server
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

## Stay in touch

- Authors - [Dmitry Burygin](https://github.com/DmitryByrigin?tab=overview&from=2023-12-01&to=2023-12-31),
[Ponomarov Artem](https://github.com/Aspergillusplay)

## License

Licensed under the [MIT license](https://github.com/kamilmysliwiec).
