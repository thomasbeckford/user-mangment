'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { generateReactHelpers } from '@uploadthing/react'
import type { OurFileRouter } from '@/api/uploadthing/core'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import * as yup from 'yup'
import { createOrUpdatePersona } from '@/utils/mutations/create-or-update-persona'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import type { UserProps } from '@/types'
import { blobToBase64 } from '@/utils/blob-to-base64'

type FormValues = {
  id: number | undefined
  email: string
  name: string
  image: File | string | undefined
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

type Props = {
  data?: UserProps
}

const PersonaForm = (props: Props) => {
  const { data } = props
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: data?.id || undefined,
      email: data?.email || '',
      name: data?.name || '',
      image: data?.image || undefined,
    },
  })

  const onSubmit = async (data: FormValues) => {
    let imageUrl = null

    if (data.image instanceof File) {
      const response = await uploadFiles([data.image], 'imageUploader')

      console.log('UPLOAD', response)

      if (response[0].fileUrl) {
        imageUrl = response[0].fileUrl
      }
    }

    const newData = {
      id: data?.id || undefined,
      email: data.email,
      name: data.name,
      image: imageUrl,
    }

    const res = await createOrUpdatePersona(newData)

    if (res) {
      toast.success('Persona agregada')
      router.back()
      router.refresh()
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    if (!file) {
      toast.error('No file selected')
      return
    }

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast.error('Only images or PDFs are allowed')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
      setValue('image', file) // set 'image' to the first File in the array
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const getImagePreview = async () => {
      if (!data?.image) return
      try {
        const response = await fetch(data.image)
        const blob = await response.blob()
        const image = await blobToBase64(blob)
        setImagePreview(image as string)

        const extension = blob.type.split('/')[1] // Get the file extension from the blob type
        const filename = `filename.${extension}`
        new File([blob], filename, { type: blob.type }) // Create the new File object with the updated filename
        setValue('image', new File([blob], filename, { type: blob.type }))
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    getImagePreview()
  }, [data?.image, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-56 space-y-4">
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
                className={`w-full  border cursor-pointer  hover:ring-2 rounded-full ${
                  errors.image ? 'border-red-500' : 'border-transparent'
                } `}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="hover:opacity-50 rounded-full object-contain"
                    width={500}
                    height={500}
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
      </div>

      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          false ? 'opacity-50 cursor-not-allowed' : ''
        }'}`}
      >
        {false ? 'Loading...' : 'Submit'}
      </button>
    </form>
  )
}

export default PersonaForm
