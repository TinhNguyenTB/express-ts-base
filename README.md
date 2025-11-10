# Express TypeScript Project

Một template project **Express + TypeScript** với:

- Function-based service
- DTO + class-validator
- wrapAsync (async controller wrapper)
- Response interceptor
- Global error handler
- ESLint + Prettier setup
- .env config

---

## 📦 Yêu cầu

- Node.js >= 18
- npm hoặc yarn
- TypeScript >= 5

---

## ⚡ Cài đặt

1. Clone project:

```bash
git clone <repo-url>
cd project-folder
```

2. Cài dependencies:

```bash
npm install
# hoặc
yarn install
```

3. Tạo file .env từ mẫu .env.example:

```bash
PORT=3000
DATABASE_URL=
JWT_SECRET=
```

## 🚀 Chạy project

Development mode (hot reload):

```bash
npm run dev
# hoặc
yarn dev
```

Build & run production:

```bash
npm run build
npm start
```

Lint & fix code:

```bash
npm run lint
npm run lint -- --fix
```

## 🔹 Notes

- responseTransformInterceptor: tự wrap res.json theo chuẩn { status, message, data }.

- globalValidationMiddleware: validate body/query/params DTO.

- wrapAsync: giúp async controller tự gửi lỗi vào global error handler.

- Dùng function-based service để tách logic nghiệp vụ khỏi controller.
