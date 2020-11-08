import { useState, useEffect } from "react"
import { fireStore } from "./firebase"

export default function useFirestore(collectionName) {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = fireStore.collection(collectionName).onSnapshot(snap => {
      const documents = []
      snap.docs.forEach(doc => documents.push({ ...doc.data() }))
      setDocs(documents)
    })

    return () => unsub()
  }, [collectionName])

  return docs
}