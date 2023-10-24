/**
 * Returns a string representing the posts page and limit.
 *
 * @param {number} page - The page number.
 * @param {number} limit - The number of posts per page.
 * @return {string} A string representing the posts page and limit.
 */
export const Posts = (page, limit) => {
  return `posts-page-${page}-limit-${limit}`
}