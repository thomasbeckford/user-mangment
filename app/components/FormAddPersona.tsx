import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { generateReactHelpers } from '@uploadthing/react'
import type { OurFileRouter } from '../api/uploadthing/core'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import * as yup from 'yup'
import { createPersona } from '../utils/create-persona'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type FormValues = {
  email: string
  name: string
  image: File | null
}
const allowedFileTypes = ['image/jpeg', 'image/png']

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  image: yup
    .mixed()
    .test(
      'fileSize',
      'The file is too large',
      (value: any) => !value || value.size <= 400000
    )
    .test(
      'fileType',
      'Unsupported File Format',
      (value: any) => !value || allowedFileTypes.includes(value.type)
    ),
})

const { uploadFiles } = generateReactHelpers<OurFileRouter>()

const FormAddPersona = () => {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    let imageUrl = null

    if (data.image) {
      const response = await uploadFiles([data.image], 'imageUploader')

      if (response[0].fileUrl) {
        imageUrl = response[0].fileUrl
      }
    }

    const newData = {
      email: data.email,
      name: data.name,
      image: imageUrl,
    }

    const res = await createPersona(newData)

    if (res) {
      toast.success('Persona agregada')
      router.refresh()
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    console.log(file)
    if (!file) {
      // handle error when no file is selected
      toast.error('No file selected')
      return
    }
    // Check if file type is either an image or a PDF
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      // Show an error toast notification
      toast.error('Only images or PDFs are allowed')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
      setValue('image', acceptedFiles[0])
    }

    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block   mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`block w-full p-2 border bg-blue-900 ${
            errors.email ? 'border-red-500' : 'border-blue-900'
          } rounded`}
          {...register('email')}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="name" className="block   mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className={`block w-full p-2 border bg-blue-900 ${
            errors.name ? 'border-red-500' : 'border-blue-900'
          } rounded`}
          {...register('name')}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="image" className="block  mb-2">
          Image
        </label>

        <Dropzone
          onDrop={onDrop}
          accept={[allowedFileTypes] as any}
          maxSize={400000}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={`w-full p-10 border ${
                errors.image ? 'border-red-500' : 'border-gray-400'
              } rounded`}
            >
              <input {...getInputProps()} />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-56 object-contain"
                  width={100}
                  height={100}
                />
              ) : (
                <p className="text-gray-500 text-center">
                  Drag and drop your image here or click to select an image.
                </p>
              )}
            </div>
          )}
        </Dropzone>

        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  )
}

export default FormAddPersona
