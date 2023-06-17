interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px'
      }}
    >
      {children}
    </div>
  )
}

export default MainLayout
