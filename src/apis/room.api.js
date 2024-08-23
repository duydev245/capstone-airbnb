

import React from 'react'
import fetcher from './fetcher';

export const roomApi = {
    getRoomsById: async (maViTri) => {
        try {
            const response = await fetcher.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`)
            return response.data.content
        } catch (error) {
            throw Error(error)
        }
    }
}
