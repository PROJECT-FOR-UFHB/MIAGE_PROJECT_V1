
const helpers = {

getFileExtension (filename) {
  return filename.split('.').pop().toLowerCase()
},

isImage (filePath) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const ext = this.getFileExtension(filePath || '')
  return imageExtensions.includes(ext)
},

isPdf (filePath) {
  const ext = this.getFileExtension(filePath || '')
  return ext === 'pdf'
},

getFileUrl (filePath) {
  return `${import.meta.env.VITE_FILE_URL}${filePath}`
},

getCorsUrl (idFile) {
  return `${import.meta.env.VITE_API_URL}/files/${idFile}`
}

}

export default helpers