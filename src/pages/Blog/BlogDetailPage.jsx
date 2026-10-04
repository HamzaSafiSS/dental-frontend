import { useParams, Link, Navigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/PublicLayout';
import { IconCalendar, IconArrowRight } from '../../components/ui/Icons';
import { BLOG_POSTS } from './BlogData';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const { slug } = useParams();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get 2 related posts (same category, excluding current) or just any 2 recent posts
  let relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id);
  if (relatedPosts.length < 2) {
    const otherPosts = BLOG_POSTS.filter(p => p.id !== post.id && !relatedPosts.includes(p));
    relatedPosts = [...relatedPosts, ...otherPosts].slice(0, 2);
  } else {
    relatedPosts = relatedPosts.slice(0, 2);
  }

  return (
    <PublicLayout>
      <div className="blog-detail-page">
        {/* Post Header with Image Background */}
        <header className="blog-detail-header" style={{ backgroundImage: `url(${post.image})` }}>
          <div className="blog-detail-overlay"></div>
          <div className="container blog-detail-header-content animation-fade-up">
            <Link to="/blog" className="back-link">
              &larr; Back to all articles
            </Link>
            <span className="post-category-badge">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="post-meta-detailed">
              <span className="meta-item">
                <span className="meta-avatar">{post.author.charAt(4)}</span> {/* Quick initial */}
                {post.author}
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{post.date}</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{post.readTime}</span>
            </div>
          </div>
        </header>

        <main className="container blog-detail-container">
          <div className="blog-detail-layout">
            
            {/* Article Content */}
            <article className="blog-article-content">
              {/* Note: In a real app, use a proper sanitizer or markdown parser. Using dangerouslySetInnerHTML for mock HTML content. */}
              <div 
                className="article-body" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              <div className="article-footer">
                <div className="share-links">
                  <span>Share this article:</span>
                  <button className="share-btn">Facebook</button>
                  <button className="share-btn">Twitter</button>
                  <button className="share-btn">Email</button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* CTA Card */}
              <div className="sidebar-cta-card">
                <h3>Ready to improve your smile?</h3>
                <p>Schedule a consultation with our experienced dental team today.</p>
                <Link to="/book-appointment" className="btn btn-primary btn-block">
                  <IconCalendar size={16} /> Book Appointment
                </Link>
              </div>

              {/* Related Articles */}
              <div className="related-articles">
                <h3>Related Articles</h3>
                <div className="related-grid">
                  {relatedPosts.map(related => (
                    <Link to={`/blog/${related.slug}`} key={related.id} className="related-card">
                      <div className="related-img">
                        <img src={related.image} alt={related.title} />
                      </div>
                      <div className="related-info">
                        <h4>{related.title}</h4>
                        <span>{related.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </PublicLayout>
  );
}
