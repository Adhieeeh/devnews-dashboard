import React, { useState, useEffect } from 'react';


const MOCK_NEWS_DATA = [
  { id: 1, category: "Frontend", title: "React 19 Core Hooks Architecture Unveiled", summary: "A deep dive into the new Server Action pipeline, asset loading optimizations, and native document metadata compilers handling background assets.", readTime: "4 min read" },
  { id: 2, category: "Backend", title: "Next.js App Router Edge Runtime Caching Benchmarks", summary: "Evaluating execution latency reductions when migrating REST API data fetching nodes over to geographically distributed CDN server frameworks.", readTime: "6 min read" },
  { id: 3, category: "Security", title: "Defending Node.js Server Environments Against Prototype Pollution", summary: "An architectural blueprint detailing strict input validation procedures to secure Express backend route parameters from malicious data injections.", readTime: "8 min read" },
  { id: 4, category: "Frontend", title: "Tailwind CSS v4 Engine Performance Re-engineering", summary: "Analyzing the brand new lightning-fast Rust compiler module built into the CSS compiler pipeline to achieve 10x quicker generation cycles.", readTime: "5 min read" },
  { id: 5, category: "Backend", title: "GraphQL vs REST: Designing Asynchronous Microservice Networks", summary: "Comparing bandwidth efficiency profiles and data over-fetching problems inside enterprise data layers utilizing distributed query routers.", readTime: "7 min read" }
];

function App() {

  const [news, setNews] = useState(MOCK_NEWS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('devnews_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('devnews_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);


  const toggleBookmark = (article) => {
    if (bookmarks.some(b => b.id === article.id)) {
      setBookmarks(bookmarks.filter(b => b.id !== article.id));
    } else {
      setBookmarks([...bookmarks, article]);
    }
  };

 
  const filteredArticles = news.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1150px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#fafafa', color: '#1e293b', minHeight: '100vh' }}>
      
      {/* APP TITLE HEADER STRIP */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '35px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '30px', fontWeight: '800', color: '#2563eb', letterSpacing: '-0.5px' }}>📰 DevNews Digest</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Curated real-time technical documentation aggregates and engineering feed updates.</p>
        </div>
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 20px', borderRadius: '12px', textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#1d4ed8', uppercase: 'true' }}>Saved Bookmarks</span>
          <h3 style={{ margin: '0', fontSize: '22px', color: '#1e3a8a' }}>{bookmarks.length} Articles</h3>
        </div>
      </header>

      {/*  */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        {/*  */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Frontend', 'Backend', 'Security'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backgroundColor: selectedCategory === cat ? '#2563eb' : '#fff', color: selectedCategory === cat ? '#fff' : '#475569', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: '0.15s' }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/*  */}
        <input 
          type="text" 
          placeholder="🔍 Search article indexes..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', maxWidth: '300px', fontSize: '14px', boxSizing: 'border-box' }}
        />
      </div>

      {/* */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        
        {/* */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', margin: '0', color: '#475569', fontWeight: '700' }}>Aggregated Articles Feed ({filteredArticles.length})</h2>
          
          {filteredArticles.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #cbd5e1', borderRadius: '16px', color: '#94a3b8', backgroundColor: '#fff' }}>
              No matching articles index records located inside active query fields.
            </div>
          ) : (
            filteredArticles.map(article => {
              const isSaved = bookmarks.some(b => b.id === article.id);
              return (
                <article key={article.id} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', uppercase: 'true', backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px' }}>{article.category}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>⏱️ {article.readTime}</span>
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>{article.title}</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>{article.summary}</p>
                  </div>
                  <button 
                    onClick={() => toggleBookmark(article)}
                    style={{ alignSelf: 'flex-start', padding: '8px 14px', border: isSaved ? '1px solid #ef4444' : '1px solid #2563eb', color: isSaved ? '#ef4444' : '#2563eb', background: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}
                  >
                    {isSaved ? '🗑️ Remove Saved Link' : ' Add to Read Later'}
                  </button>
                </article>
              );
            })
          )}
        </section>

        {/*  */}
        <section style={{ height: 'fit-content' }}>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 20px 0', color: '#0f172a', fontWeight: '700' }}>📚 Read Later Desk</h2>
            
            {bookmarks.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', margin: '0', textAlign: 'center', padding: '20px 0' }}>
                Your reading list stack is empty. Click "Add to Read Later" on any digest item card to populate.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bookmarks.map(b => (
                  <div key={b.id} style={{ padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ maxWidth: '85%' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#1e293b', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</h4>
                      <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700' }}>{b.category}</span>
                    </div>
                    <button onClick={() => toggleBookmark(b)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;