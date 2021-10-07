package com.sv.keeptrack

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.sv.keeptrack.data.item
import com.sv.keeptrack.databinding.FragmentHomeBinding


class Home : Fragment() {
    private val viewModel: noteViewModel by activityViewModels{
            noteViewModelFactory(
                (activity?.application as noteApplication).database.itemDao()
            )
    }
    lateinit var item: item
    private var _binding: FragmentHomeBinding?=null
    private val binding get()=_binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding=FragmentHomeBinding.inflate(inflater,container,false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val adapter=ItemListAdapter{
            val action=HomeDirections.actionHome2ToEditNote(it.id)
            this.findNavController().navigate(action)
        }
            binding.recyclerView.adapter=adapter
            viewModel.allItems.observe(this.viewLifecycleOwner) { items ->
                items.let { adapter.submitList(it) }
            }
            binding.recyclerView.layoutManager=StaggeredGridLayoutManager(2,LinearLayoutManager.VERTICAL)
            binding.floatingActionButton.setOnClickListener{gotoNextScreen()}

    }
    fun gotoNextScreen(){
        findNavController().navigate(R.id.action_home2_to_takeNote)
    }

}