
export type Image = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

// Тип для відповіді від API, масив зображень + кількість сторінок
export type ApiResponse = {
  data: Image[]; // Масив зображень
  totalPages: number; // Кількість сторінок
}