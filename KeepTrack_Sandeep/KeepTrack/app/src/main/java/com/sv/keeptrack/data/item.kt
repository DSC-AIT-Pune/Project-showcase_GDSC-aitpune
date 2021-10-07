package com.sv.keeptrack.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class item (
                @PrimaryKey(autoGenerate = true)
                val id: Int=0,
                val title:String,
                val note:String,
)