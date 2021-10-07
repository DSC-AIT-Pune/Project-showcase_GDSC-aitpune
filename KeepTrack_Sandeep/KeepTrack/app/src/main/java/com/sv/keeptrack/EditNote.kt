package com.sv.keeptrack

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.sv.keeptrack.data.item
import com.sv.keeptrack.databinding.FragmentEditNoteBinding
import com.sv.keeptrack.databinding.FragmentHomeBinding


class EditNote : Fragment() {
    private val viewModel: noteViewModel by activityViewModels{
        noteViewModelFactory(
            (activity?.application as noteApplication).database.itemDao()
        )
    }
    private val navigationArgs: EditNoteArgs by navArgs()
    lateinit var item: item
    private var _binding: FragmentEditNoteBinding?=null
    private val binding get()=_binding!!


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding= FragmentEditNoteBinding.inflate(inflater,container,false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val id = navigationArgs.itemId
        viewModel.retrieveItem(id).observe(this.viewLifecycleOwner){    selectedItem ->
            item=selectedItem
            bind(item)
        }
    }
    private fun bind(item: item){
        binding.apply {
            etitle.setText(item.title, TextView.BufferType.SPANNABLE)
            enote.setText(item.note, TextView.BufferType.SPANNABLE)
            delete.setOnClickListener { showConfirmationDialog()}
            save.setOnClickListener{editItem()}
        }
    }
    private fun deleteItem(){
        viewModel.deleteItem(item)
        findNavController().navigateUp()
    }

    private fun showConfirmationDialog() {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle(getString(android.R.string.dialog_alert_title))
            .setMessage(getString(R.string.delete_question))
            .setCancelable(false)
            .setNegativeButton(getString(R.string.no)) { _, _ -> }
            .setPositiveButton(getString(R.string.yes)) { _, _ ->
                deleteItem()
            }
            .show()
    }
    private fun isEntryValid():Boolean{
        return viewModel.isEntryValid(
            binding.etitle.text.toString(),
            binding.enote.text.toString())
    }
    private fun editItem(){
        if(isEntryValid()) {
            viewModel.updateItem(
                itemId = navigationArgs.itemId,
                binding.etitle.text.toString(),
                binding.enote.text.toString()
            )
            findNavController().navigate(R.id.action_editNote_to_home2)
        }
    }


}