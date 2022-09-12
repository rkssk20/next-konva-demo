import { useState, useEffect  } from "react"

const useImage = (selectImage: string) => {
  const [image, setImage] = useState<HTMLImageElement>()
  
  useEffect(() => {
    const handleImage = () => {
      setImage(newImage)
    }

    const newImage = new Image
    newImage.src = selectImage
    newImage.addEventListener('load', handleImage)
  
    return () => newImage.removeEventListener('load', handleImage)
  }, [selectImage])

  return image
}

export default useImage