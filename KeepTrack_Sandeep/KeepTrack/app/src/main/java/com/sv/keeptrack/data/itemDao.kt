package com.sv.keeptrack.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface itemDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insert(item: item)

    @Update
    suspend fun update(item: item)

    @Delete
    suspend fun delete(item: item)

    @Query("SELECT * from item ORDER BY id ASC")
    fun getItems(): Flow<List<item>>

    @Query("SELECT * from item WHERE id= :id")
    fun getItem(id:Int):Flow<item>
}