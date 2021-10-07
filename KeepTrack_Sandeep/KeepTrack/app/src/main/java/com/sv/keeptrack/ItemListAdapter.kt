package com.sv.keeptrack

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.sv.keeptrack.ItemListAdapter.*
import com.sv.keeptrack.data.item
import com.sv.keeptrack.databinding.ItemBinding
import androidx.recyclerview.widget.ListAdapter

class ItemListAdapter(private val onItemClicked:(item)->Unit):
    ListAdapter<item,ItemListAdapter.ItemViewHolder>(DiffCallBack){
    override fun onCreateViewHolder(parent: ViewGroup,viewType:Int):ItemViewHolder{
        return ItemViewHolder(
            ItemBinding.inflate(
                LayoutInflater.from(
                    parent.context
                )
            )
        )
    }
    override fun onBindViewHolder(holder:ItemViewHolder, position:Int){
        val current=getItem(position)
        holder.itemView.setOnClickListener{
            onItemClicked(current)
        }
        holder.bind(current)
    }
    class ItemViewHolder(private var binding: ItemBinding):
            RecyclerView.ViewHolder(binding.root) {
                fun bind(item: item){
                    binding.apply {
                        title.text=item.title
                        note.text=item.note
                    }

                }
            }
    companion object{
        private val DiffCallBack= object :DiffUtil.ItemCallback<item>(){
            override fun areItemsTheSame(oldItem: item, newItem: item): Boolean {
                return oldItem==newItem
            }

            override fun areContentsTheSame(oldItem: item, newItem: item): Boolean {
                return oldItem.title==newItem.title
            }
        }
    }
}