package com.sv.keeptrack.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
@Database(entities = [item::class], version = 1,exportSchema = false)
abstract class itemRoomDatabase: RoomDatabase() {
    abstract fun itemDao(): itemDao
    companion object{
        @Volatile
        private var INSTANCE: itemRoomDatabase?=null
        fun getDatabase(context: Context): itemRoomDatabase{
            return INSTANCE?: synchronized(this){
                val instance = Room.databaseBuilder(context.applicationContext,itemRoomDatabase::class.java,"item_database")
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE=instance
                instance
            }
        }
    }
}