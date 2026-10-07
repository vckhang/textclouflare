import React, { useEffect, useState } from 'react';

// Đổi URL này thành URL Worker/Pages của bạn nếu ReactJS chạy ở domain khác
// Nếu ReactJS và Worker cùng chung 1 Cloudflare Pages thì để '/api/posts'
const API_URL = '/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.error || 'Không thể lấy dữ liệu');
      }
    } catch (err) {
      setError('Lỗi kết nối tới Server API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Blog Tin Tức - Cloudflare D1 Test</h1>
        <p style={styles.subtitle}>Danh sách bài viết từ CSDL SQLite (Cloudflare D1)</p>
      </header>

      <main style={styles.main}>
        {loading && <div style={styles.loading}>Đang tải bài viết từ Cloudflare D1...</div>}

        {error && <div style={styles.error}>{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <p style={styles.empty}>Chưa có bài viết nào trong Database.</p>
        )}

        <div style={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} style={styles.card}>
              <h2 style={styles.cardTitle}>{post.title}</h2>
              <div style={styles.meta}>
                <span>✍️ {post.author}</span> • 
                <span> 🗓️ {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              </div>
              <p style={styles.summary}>{post.summary}</p>
              <button style={styles.button}>Đọc tiếp →</button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

// Inline CSS đơn giản để test ngay không cần cài thêm thư viện
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#0f172a',
    fontSize: '2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1rem',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#2563eb',
    fontWeight: 'bold',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '10px',
  },
  meta: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '12px',
  },
  summary: {
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    flexGrow: 1,
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
};

export default App;