"use client"

import { useState, useEffect } from "react"
import { Badge, Card, Avatar, Input, Select, Pagination, Spin, Alert } from "antd"
import { SearchOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons"
import "./blog.scss"
import { getBlogs } from "../../services/blogsService"
import { getCategories } from "../../services/categoriesService"


const { Search } = Input
const { Option } = Select

function Blog() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const postsPerPage = 6

  // Get Blog Posts
  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true)
        const response = await getBlogs()
        setPosts(response || [])
        setFilteredPosts(response || [])
      } catch (err) {
        setError("Không thể tải danh sách bài viết")
        console.error("Error fetching blogs:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchApi()
  }, [])

  // Get Categories
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getCategories()
        setCategories(response || [])
      } catch (err) {
        console.error("Error fetching categories:", err)
        // Fallback to empty array if categories fail to load
        setCategories([])
      }
    }
    fetchApi()
  }, [])
  
  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === Number.parseInt(selectedCategory))
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, posts])

  const getCategoryById = (id) => {
    return categories.find((cat) => cat.id === id)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
  }

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  const handleBackToList = () => {
    setSelectedPost(null)
  }

  // Show loading spinner
  if (loading) {
    return (
      <div className="container">
        <div className="blog">
          <div className="blog__loading">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size="large" />
            <p>Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error message
  if (error) {
    return (
      <div className="container">
        <div className="blog">
          <Alert message="Lỗi tải dữ liệu" description={error} type="error" showIcon className="blog__error" />
        </div>
      </div>
    )
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  if (selectedPost) {
    const category = getCategoryById(selectedPost.category)
    return (
      <div className="container">
        <div className="blog-detail">
          <button className="blog-detail__back-btn" onClick={handleBackToList}>
            ← Quay lại danh sách
          </button>

          <article className="blog-detail__article">
            <header className="blog-detail__header">
              {category && (
                <Badge color={category.color} text={category.name} className="blog-detail__category-badge" />
              )}
              <h1 className="blog-detail__title">{selectedPost.title}</h1>

              <div className="blog-detail__meta">
                {selectedPost.author && (
                  <div className="blog-detail__meta-item">
                    <UserOutlined />
                    <span>{selectedPost.author}</span>
                  </div>
                )}
                {selectedPost.publishDate && (
                  <div className="blog-detail__meta-item">
                    <CalendarOutlined />
                    <span>{selectedPost.publishDate}</span>
                  </div>
                )}
                {selectedPost.readTime && (
                  <div className="blog-detail__meta-item">
                    <ClockCircleOutlined />
                    <span>{selectedPost.readTime}</span>
                  </div>
                )}
              </div>
            </header>

            {selectedPost.thumbnail && (
              <div className="blog-detail__thumbnail">
                <img src={selectedPost.thumbnail || "/placeholder.svg"} alt={selectedPost.title} />
              </div>
            )}

            <div className="blog-detail__content" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <footer className="blog-detail__footer">
                <div className="blog-detail__tags">
                  {selectedPost.tags.map((tag, index) => (
                    <Badge key={index} count={tag} className="blog-detail__tag" />
                  ))}
                </div>
              </footer>
            )}
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="blog">
        <header className="blog__header">
          <h1 className="blog__title">Blog Lập Trình</h1>
          <p className="blog__subtitle">Chia sẻ kiến thức và kinh nghiệm lập trình từ cơ bản đến nâng cao</p>
        </header>

        <div className="blog__filters">
          <div className="blog__search">
            <Search
              placeholder="Tìm kiếm bài viết..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => !e.target.value && setSearchTerm("")}
            />
          </div>

          <div className="blog__category-filter">
            <Select defaultValue="all" size="large" style={{ width: 200 }} onChange={handleCategoryChange}>
              <Option value="all">Tất cả danh mục</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id.toString()}>
                  {category.icon && `${category.icon} `}
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="blog__categories">
            {categories.map((category) => (
              <div key={category.id} className="blog__category-card" style={{ borderColor: category.color }}>
                <div className="blog__category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className="blog__category-name">{category.name}</h3>
                <p className="blog__category-desc">{category.description}</p>
                <div className="blog__category-count">
                  {posts.filter((post) => post.category === category.id).length} bài viết
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="blog__posts">
          {currentPosts.length > 0 ? (
            <>
              <div className="blog__posts-grid">
                {currentPosts.map((post) => {
                  const category = getCategoryById(post.category)
                  return (
                    <Card
                      key={post.id}
                      className="blog__post-card"
                      cover={
                        <div className="blog__post-thumbnail">
                          <img
                            src={post.thumbnail || "/placeholder.svg?height=200&width=350&text=Blog+Post"}
                            alt={post.title}
                          />
                          {category && (
                            <Badge color={category.color} text={category.name} className="blog__post-category" />
                          )}
                        </div>
                      }
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="blog__post-content">
                        <h3 className="blog__post-title">{post.title}</h3>
                        <p className="blog__post-description">{post.shortDescription}</p>

                        <div className="blog__post-meta">
                          {post.author && (
                            <div className="blog__post-author">
                              <Avatar size="small" icon={<UserOutlined />} />
                              <span>{post.author}</span>
                            </div>
                          )}
                          {post.publishDate && (
                            <div className="blog__post-date">
                              <CalendarOutlined />
                              <span>{post.publishDate}</span>
                            </div>
                          )}
                          {post.readTime && (
                            <div className="blog__post-read-time">
                              <ClockCircleOutlined />
                              <span>{post.readTime}</span>
                            </div>
                          )}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div className="blog__post-tags">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} count={tag} className="blog__post-tag" />
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>

              {filteredPosts.length > postsPerPage && (
                <div className="blog__pagination">
                  <Pagination
                    current={currentPage}
                    total={filteredPosts.length}
                    pageSize={postsPerPage}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bài viết`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="blog__no-results">
              <h3>Không tìm thấy bài viết nào</h3>
              <p>Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
