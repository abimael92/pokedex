import { vi } from 'vitest';
import '@testing-library/jest-dom';

globalThis.jest = vi as unknown as typeof jest;
