import { supabase } from '@lib/supabase'
import { encodeFilePathToUrl } from '@lib/utils'

export async function uploadFile(file, path) {
  try {
    const encodedFilePath = encodeFilePathToUrl(path)
    const { data: fileExists } = await supabase.storage
      .from('production')
      .getPublicUrl(encodedFilePath)

    if (fileExists) {
      const { error: deleteError } = await supabase.storage
        .from('production')
        .remove([encodedFilePath])
      if (deleteError) {
        console.log(deleteError)
        throw deleteError
      }
    }

    const { data, error } = await supabase.storage
      .from('production')
      .upload(encodedFilePath, file)
    if (error) {
      throw error
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production${encodedFilePath}`
  } catch (error) {
    console.log(error)
    return ''
  }
}
