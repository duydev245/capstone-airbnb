

import React from 'react'
import fetcher from './fetcher';

export const locationApi = {
    getLocation: async () => {
        try {
            const response = await fetcher.get(`/vi-tri`);

            return response.data.content
        } catch (error) {
            throw Error(error)

        }
    }
};
