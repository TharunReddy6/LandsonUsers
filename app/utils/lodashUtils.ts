/**
 * Utility functions to provide Lodash functionality with fallbacks
 */

// Define shared interfaces for component data
export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  link: string;
  featured: boolean;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number | null;
  image: string;
  rating?: number;
  reviewCount?: number;
  category: string;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface SparePart {
  id: number;
  name: string;
  category: string;
  compatibility: string[];
  price: number;
  discountedPrice: number | null;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: number;
  image: string;
  featured: boolean;
}

// Try to import lodash, handle missing dependency gracefully
let _: any;
try {
  _ = require('lodash');
} catch (e) {
  console.warn('Lodash not found, using fallback implementations');
  // Create minimal substitutes for commonly used lodash functions
  _ = {
    // Array functions
    map: function<T, U>(arr: T[], callback: (value: T, index: number, array: T[]) => U): U[] {
      return arr.map(callback);
    },
    filter: function<T>(arr: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] {
      return arr.filter(predicate);
    },
    find: function<T>(arr: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined {
      return arr.find(predicate);
    },
    uniq: function<T>(arr: T[]): T[] {
      return [...new Set(arr)];
    },
    chunk: function<T>(arr: T[], size: number): T[][] {
      const chunks: T[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    },
    // Object functions
    get: function(obj: any, path: string, defaultValue?: any): any {
      const travel = (regexp: RegExp) =>
        String.prototype.split
          .call(path, regexp)
          .filter(Boolean)
          .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
      const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
      return result === undefined || result === obj ? defaultValue : result;
    }
  };
}

export default _; 