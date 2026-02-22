/**
 * Transform Strategy Pattern
 * Separates horizontal and vertical transform logic using plain objects
 */
import type { Direction, TransformStrategy } from '../types';
/**
 * Horizontal transform strategy
 * Handles left-to-right carousel movement
 */
declare const horizontalStrategy: TransformStrategy;
/**
 * Vertical transform strategy
 * Handles top-to-bottom carousel movement
 */
declare const verticalStrategy: TransformStrategy;
/**
 * Factory function to get appropriate strategy
 */
export declare function createTransformStrategy(direction: Direction): TransformStrategy;
export { horizontalStrategy, verticalStrategy };
//# sourceMappingURL=TransformStrategy.d.ts.map