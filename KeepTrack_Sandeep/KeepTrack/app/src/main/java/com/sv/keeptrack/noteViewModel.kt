/*
 * Copyright (C) 2021 The Android Open Source Project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.sv.keeptrack

import androidx.lifecycle.*
import com.sv.keeptrack.data.item
import com.sv.keeptrack.data.itemDao
import kotlinx.coroutines.launch

/**
 * View Model to keep a reference to the Inventory repository and an up-to-date list of all items.
 *
 */
class noteViewModel(private val itemDao: itemDao) : ViewModel() {

    val allItems:LiveData<List<item>> = itemDao.getItems().asLiveData()

    fun retrieveItem(id:Int): LiveData<item>{
        return itemDao.getItem(id).asLiveData()
    }

    fun deleteItem(item:item){
        viewModelScope.launch {
            itemDao.delete(item)
        }
    }

    private fun getUpdatedItemEntry(itemId:Int, title:String,note:String): item{
        return item(
            id = itemId,
            title=title,
            note=note
        )
    }

    fun updateItem(itemId:Int,title: String,note: String){
        val updatedItem=getUpdatedItemEntry(itemId,title,note)
        updateItem(updatedItem)
    }
    private fun updateItem(item: item){
        viewModelScope.launch {
            itemDao.update(item)
        }
    }

    /**
     * Inserts the new Item into database.
     */
    fun addNewItem(title: String, note: String) {
        val newItem = getNewItemEntry(title, note)
        insertItem(newItem)
    }

    /**
     * Launching a new coroutine to insert an item in a non-blocking way
     */
    private fun insertItem(item: item) {
        viewModelScope.launch {
            itemDao.insert(item)
        }
    }

    /**
     * Returns true if the EditTexts are not empty
     */
    fun isEntryValid(title: String, note: String): Boolean {
        if (title.isBlank() || note.isBlank()) {
            return false
        }
        return true
    }

    /**
     * Returns an instance of the [Item] entity class with the item info entered by the user.
     * This will be used to add a new entry to the Inventory database.
     */
    private fun getNewItemEntry(title: String, note: String): item {
        return item(
            title = title,
            note = note,
        )
    }
}

/**
 * Factory class to instantiate the [ViewModel] instance.
 */
class noteViewModelFactory(private val itemDao: itemDao) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(noteViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return noteViewModel(itemDao) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
