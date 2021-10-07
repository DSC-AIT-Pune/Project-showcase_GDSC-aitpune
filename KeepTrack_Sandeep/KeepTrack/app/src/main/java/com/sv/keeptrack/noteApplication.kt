package com.sv.keeptrack

import android.app.Application
import com.sv.keeptrack.data.itemRoomDatabase

class noteApplication:Application() {
    val database:itemRoomDatabase by lazy{itemRoomDatabase.getDatabase(this)}
}