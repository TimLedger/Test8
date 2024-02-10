export interface ApiQuote {
    author: string,
    category: string,
    text: string,
}

export interface ApiCategory {
    id: string;
    title: string;
}

export interface Quote extends ApiQuote{
    id: string;
}

  
  