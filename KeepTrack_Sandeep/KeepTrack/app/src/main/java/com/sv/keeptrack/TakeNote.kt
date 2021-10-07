package com.sv.keeptrack

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.sv.keeptrack.data.item
import com.sv.keeptrack.databinding.FragmentTakeNoteBinding

class TakeNote : Fragment() {
    private val viewModel: noteViewModel by activityViewModels{
      noteViewModelFactory(
          (activity?.application as noteApplication).database.itemDao()
     )
    }
    lateinit var item: item
    private var _binding:FragmentTakeNoteBinding?=null
    private val binding get()=_binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding=FragmentTakeNoteBinding.inflate(inflater,container,false)
        return binding.root
    }
    private fun isEntryValid():Boolean{
        return viewModel.isEntryValid(
            binding.input.text.toString(),
            binding.noteInput.text.toString())
    }
    private fun addNewItem(){
       if(isEntryValid()){
            viewModel.addNewItem(
                binding.input.text.toString(),
                binding.noteInput.text.toString()
            )
        }
        findNavController().navigate(R.id.action_takeNote_to_home2)
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
             binding.save.setOnClickListener {
                addNewItem()
             }

    }

    override fun onDestroyView() {
        super.onDestroyView()
        // Hide keyboard.
        val inputMethodManager = requireActivity().getSystemService(Context.INPUT_METHOD_SERVICE) as
                InputMethodManager
        inputMethodManager.hideSoftInputFromWindow(requireActivity().currentFocus?.windowToken, 0)
        _binding = null
    }

}