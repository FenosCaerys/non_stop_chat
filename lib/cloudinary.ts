import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Types pour les uploads
export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  resource_type: string
  format: string
  bytes: number
  width?: number
  height?: number
}

// Fonction utilitaire pour uploader un fichier
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  fileName: string,
  folder: string = 'chat-uploads'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${folder}/${Date.now()}-${fileName}`,
        resource_type: 'auto', // Détecte automatiquement le type de fichier
        quality: 'auto:good', // Optimisation automatique de la qualité
        fetch_format: 'auto', // Format optimal selon le navigateur
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result as CloudinaryUploadResult)
        } else {
          reject(new Error('Upload failed: no result'))
        }
      }
    )
    
    uploadStream.end(fileBuffer)
  })
}

// Fonction pour supprimer un fichier de Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error)
    throw error
  }
}

// Fonction pour générer une URL optimisée
export const getOptimizedUrl = (
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
  } = {}
): string => {
  return cloudinary.url(publicId, {
    quality: options.quality || 'auto:good',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    crop: 'fill',
  })
}
