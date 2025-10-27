/**
 * @summary
 * Test helper functions
 *
 * @module tests/helpers
 *
 * @description
 * Provides reusable helper functions for testing throughout the application.
 */

/**
 * @summary
 * Generates a random ID for testing
 *
 * @function generateTestId
 * @module tests/helpers
 *
 * @returns {number} Random test ID
 *
 * @example
 * const testId = generateTestId();
 */
export function generateTestId(): number {
  return Math.floor(Math.random() * 1000000);
}

/**
 * @summary
 * Creates a delay for testing async operations
 *
 * @function delay
 * @module tests/helpers
 *
 * @param {number} ms - Milliseconds to delay
 *
 * @returns {Promise<void>}
 *
 * @example
 * await delay(1000); // Wait 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
