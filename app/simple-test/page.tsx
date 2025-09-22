export default function SimpleTestPage() {
  return (
    <div style={{ 
      direction: 'rtl', 
      textAlign: 'right', 
      backgroundColor: 'black', 
      color: '#B48500', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>اختبار اللغة - Language Test</h1>
      <p>هذا نص تجريبي باللغة العربية</p>
      <p>This is a test text in English</p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: '10px', 
        marginTop: '20px' 
      }}>
        <button style={{ 
          backgroundColor: '#B48500', 
          color: 'black', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          عربي
        </button>
        <button style={{ 
          backgroundColor: '#333', 
          color: '#B48500', 
          border: '1px solid #B48500', 
          padding: '10px 20px', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          English
        </button>
      </div>
    </div>
  )
}