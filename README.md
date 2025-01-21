# Dokumentasi Proyek Nodewave Todo App

## 1. Pendahuluan

Proyek ini adalah aplikasi manajemen tugas (Todo App) yang dibuat menggunakan teknologi Next.js, TypeScript, TailwindCSS, Material-UI, dan Axios. Aplikasi memiliki fitur autentikasi pengguna, manajemen tugas (Todo List), serta peran pengguna (USER & ADMIN).

Proyek ini disiapkan untuk memenuhi **kebutuhan Assessment dari Nodewave**, dengan struktur yang modular, kode yang mudah dibaca, dan dokumentasi yang jelas.

## 2. Struktur Proyek

Berikut adalah struktur utama proyek:

```
├── README.md                # Dokumentasi proyek
├── eslint.config.mjs        # Konfigurasi ESLint
├── next.config.ts           # Konfigurasi Next.js
├── package.json             # Dependensi proyek
├── postcss.config.mjs       # Konfigurasi PostCSS
├── tailwind.config.ts       # Konfigurasi TailwindCSS
├── tsconfig.json            # Konfigurasi TypeScript
├── public/                  # File statis (gambar)
└── src/                     # Semua kode sumber
    ├── app/                 # Aplikasi utama, termasuk halaman
    │   ├── globals.css      # style global
    │   ├── layout.tsx       # Layout aplikasi
    │   ├── page.tsx         # Halaman utama
    │   ├── admin/           # Halaman admin
    │   │   └── page.tsx
    │   ├── login/           # Halaman login
    │   │   └── page.tsx
    │   ├── register/        # Halaman registrasi
    │   │   └── page.tsx
    │   └── todo/            # Halaman todo
    │       └── page.tsx
    ├── components/          # Komponen 
    │   ├── auth/            # Komponen untuk autentikasi
    │   │   ├── LoginForm.tsx
    │   │   └── RegisterForm.tsx
    │   ├── navbar/          # Komponen navbar
    │   │   └── Navbar.tsx
    │   ├── sidebar/         # Komponen sidebar
    │   │   └── Sidebar.tsx
    │   ├── todo/            # Komponen untuk daftar tugas
    │   │   └── TodoList.tsx
    │   └── ui/              # Komponen UI umum
    │       ├── Button.tsx
    │       └── Input.tsx
    ├── contexts/            # Contexts untuk aplikasi
    │   └── AuthContext.tsx
    ├── lib/                 # Utility, konfigurasi Axios
    │   └── axios.ts
    ├── styles/              # Custom styles
    │   └── inputStyles.ts
    └── types/               # Definisi tipe TypeScript
        ├── auth.ts
        └── todo.ts

```

## 3. Instalasi

1. Clone repository:
    
    ```
    git clone https://github.com/Fanjaa/todo-nodewave
    
    ```
    
2. Masuk ke direktori proyek:
    
    ```
    cd todo-nodewave
    
    ```
    
3. Instal dependensi:
    
    ```
    npm install
    
    ```
    
4. Jalankan aplikasi:
    
    ```
    npm run dev
    
    ```
    

## 4. Autentikasi

### AuthContext

Terdapat konteks autentikasi di dalam file `context/AuthContext.tsx` yang menyediakan fungsi:

- `login(credentials: LoginCredentials): Promise<void>`
- `logout(): void`
- State:
    - `isAuthenticated: boolean`
    - `loading: boolean`
    - `fullName: string | null`
    - `role: string | null`

Penggunaan:

```tsx
const { login, logout, isAuthenticated } = useAuth();

```

## 5. Komponen

### `Sidebar.tsx`

Komponen sidebar dengan properti:

- `isOpen: boolean`
- `toggleSidebar(): void`

```tsx
<Sidebar isOpen={true} toggleSidebar={handleToggle} />

```

## 6. API Service

Terdapat konfigurasi Axios di dalam file `lib/axios.ts` untuk memudahkan komunikasi dengan backend:

```
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

```

Fungsi untuk mengambil daftar tugas:

```
const response = await api.get<TodoResponse>('/todos');

```

## 7. Halaman

### `Login/Page.tsx`

Halaman login akan mengarahkan pengguna yang sudah terautentikasi ke halaman todo atau admin berdasarkan peran.

```tsx
useEffect(() => {
  if (isAuthenticated && role === "USER") {
    router.push("/todo");
  } else if (isAuthenticated && role === "ADMIN") {
    router.push("/admin");
  }
}, [isAuthenticated, router]);

```

### `Todo/Page.tsx`

Halaman todo hanya dapat diakses oleh pengguna dengan peran USER, jika tidak maka akan diarahkan ke halaman login.

## 8. Custom Styles

Custom styles menggunakan Material-UI disimpan di dalam file `styles/customStyles.ts`:

```
export const inputStyle = {
  '& .MuiFormLabel-asterisk': { display: 'none' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': { borderColor: '#e0e0e0' },
    '&:hover fieldset': { borderColor: '#bdbdbd' },
    '&.Mui-focused fieldset': { borderWidth: '1px', borderColor: '#50B5FF' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#50B5FF' },
};

```

Penggunaan:

```tsx
<TextField sx={inputStyle} label="Email" variant="outlined" />

```
