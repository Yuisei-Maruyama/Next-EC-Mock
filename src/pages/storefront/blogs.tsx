import { useQuery } from '@apollo/client'
import { GET_BLOGS_QUERY } from '@/graphql/queries/blogs'

const Blogs = () => {
  const { loading, error, data } = useQuery(GET_BLOGS_QUERY, {
    variables: { first: 10 }, // replace 10 with the number of blogs you want to fetch
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  return (
    <div>
      {data.blogs.edges.map(({ node: blog }) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <a href={blog.url}>Read More</a>
          <div>
            {blog.articles.edges.map(({ node: article }) => (
              <div key={article.id}>
                <h3>{article.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                />
                <p>Published at: {article.publishedAt}</p>
                <a href={article.url}>Read Article</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blogs
