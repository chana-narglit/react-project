import backgroundImage from '../img/4083011.jpg'

const HomePage = () => {

  return (
    <>
      <div style={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 0, 
        padding: 0,
        overflow: 'hidden',
        backgroundColor:'rgb(220, 248, 252);'

      }}>
        <img 
          src={backgroundImage} 
          alt="Background" 
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: 'cover'
          }} ></img>
      </div>
    </>
  );
}
export default HomePage