import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { IconArrowRight } from '../../components/ui/Icons';
import { BLOG_POSTS, BLOG_CATEGORIES } from './BlogData';
import './BlogPage.css';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <PublicLayout>
      <div className="blog-page">
        {/* Header */}
        <header className="blog-header">
          <div className="container">
            <span className="blog-badge">Dental Health Tips</span>
            <h1>Our Blog</h1>
            <p className="subtitle">
              Expert advice, latest news, and practical tips to help you maintain a healthy, beautiful smile for life.
            </p>
          </div>
        </header>

        <main className="container blog-container">
          
          {/* Category Filter */}
          <div className="blog-filters">
            <button 
              className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Articles
            </button>
            {BLOG_CATEGORIES.map(category => (
              <button 
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post (Only show on 'All') */}
          {activeCategory === 'All' && BLOG_POSTS.length > 0 && (
            <div className="featured-post animation-fade-up">
              <div className="featured-image">
                <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} />
              </div>
              <div className="featured-content">
                <span className="post-category">{BLOG_POSTS[0].category}</span>
                <h2>{BLOG_POSTS[0].title}</h2>
                <p className="post-excerpt">{BLOG_POSTS[0].excerpt}</p>
                <div className="post-meta">
                  <span>By {BLOG_POSTS[0].author}</span>
                  <span>•</span>
                  <span>{BLOG_POSTS[0].date}</span>
                  <span>•</span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                <Link to={`/blog/${BLOG_POSTS[0].slug}`} className="btn btn-primary mt-4">
                  Read Article
                </Link>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="blog-grid">
            {filteredPosts.map((post, idx) => {
              // Skip the first post if showing 'All' as it's featured
              if (activeCategory === 'All' && idx === 0) return null;
              
              return (
                <article key={post.id} className="post-card animation-fade-up" style={{ animationDelay: `${(idx % 6) * 0.1}s` }}>
                  <Link to={`/blog/${post.slug}`} className="post-card-image">
                    <img src={post.image} alt={post.title} />
                    <span className="post-card-category">{post.category}</span>
                  </Link>
                  <div className="post-card-content">
                    <div className="post-card-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="post-card-title-link">
                      <h3>{post.title}</h3>
                    </Link>
                    <p className="post-card-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="post-card-read-more">
                      Read More <IconArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </main>
      </div>
    </PublicLayout>
  );
}
