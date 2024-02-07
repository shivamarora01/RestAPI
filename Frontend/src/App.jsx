import { useEffect, useState } from 'react'
import Showing from '../components/showing'
import PostItem from '../components/PostItem'
import axios from 'axios'

function App() {
  return (
    <>
    <PostItem/>
      <Showing/>
    </>
  )
}

export default App
