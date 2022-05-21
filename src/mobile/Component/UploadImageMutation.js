import React from 'react'
import { View } from "react-native"
import { graphql } from 'react-apollo'
import { gql } from 'graphql-tag'

function uploadImage ({mutate, file, uploaded, finishUpload}) {
  let name = null
  if (file !== null && !uploaded) {
    mutate()
      .then((result) => {
        if (result.data.upload) {
          name = result.data.upload.name
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .then(() => finishUpload(name))
  }
  return (
    <View/>
  )
}

export default graphql(
  gql`
    mutation ($file: Upload!) {
      upload: singleUpload(file: $file) {
        name
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          file: props.file,
          uploaded: props.uploaded
        },
      }
    },
  }
)(uploadImage)
