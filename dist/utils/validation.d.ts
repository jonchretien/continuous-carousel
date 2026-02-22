/**
 * Validation utilities
 */
import type { Direction } from '../types';
/**
 * Validates that an element exists
 */
export declare function validateElement(element: HTMLElement | string): HTMLElement;
/**
 * Validates carousel direction
 */
export declare function validateDirection(direction: string): Direction;
/**
 * Validates numVisible value
 */
export declare function validateNumVisible(numVisible: number | string): number;
/**
 * Validates a callback function
 */
export declare function validateCallback(callback: unknown, name: string): ((...args: unknown[]) => void) | null;
/**
 * Validates reverse option
 */
export declare function validateReverse(value: unknown): boolean;
/**
 * Validates numVisible is less than item count
 */
export declare function validateNumVisibleCount(numVisible: number, itemCount: number): void;
/**
 * Validates timing values (interval, duration)
 */
export declare function validateTiming(value: number | string, name: string): number;
//# sourceMappingURL=validation.d.ts.map