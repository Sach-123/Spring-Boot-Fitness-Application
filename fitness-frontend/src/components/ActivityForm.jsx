import { Button, MenuItem, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    additionalMetrics: {},
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!activity.duration || !activity.caloriesBurned) {
      return
    }

    setIsSubmitting(true)
    try {
      await addActivity(activity)
      onActivityAdded?.()
      setActivity({ type: 'RUNNING', duration: '', caloriesBurned: '', additionalMetrics: {} })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        label="Activity Type"
        value={activity.type}
        onChange={(e) => setActivity({ ...activity, type: e.target.value })}
        select
        fullWidth
        InputLabelProps={{ sx: { color: 'rgba(226,232,240,0.75)', fontWeight: 500 } }}
      >
        <MenuItem value="RUNNING">Running</MenuItem>
        <MenuItem value="WALKING">Walking</MenuItem>
        <MenuItem value="CYCLING">Cycling</MenuItem>
        <MenuItem value="SWIMMING">Swimming</MenuItem>
      </TextField>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
        <TextField
          label="Duration (minutes)"
          type="number"
          value={activity.duration}
          onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
          fullWidth
          InputLabelProps={{ sx: { color: 'rgba(226,232,240,0.75)', fontWeight: 500 } }}
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Calories Burned"
          type="number"
          value={activity.caloriesBurned}
          onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
          fullWidth
          InputLabelProps={{ sx: { color: 'rgba(226,232,240,0.75)', fontWeight: 500 } }}
          inputProps={{ min: 1 }}
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting || !activity.duration || !activity.caloriesBurned}
      >
        {isSubmitting ? 'Saving...' : 'Save activity'}
      </Button>
    </Stack>
  )
}

export default ActivityForm