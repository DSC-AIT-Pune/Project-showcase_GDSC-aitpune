package com.example.firebaseauthentication

import android.content.ContentValues
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize Firebase Auth
        auth = Firebase.auth

        //Register or Sign Up
        signupBtn.setOnClickListener {
            val emailOfUser: String = emailText.text.toString()
            val passwordOfUser = passwordText.text.toString()

            //function for createUserWithEmailAndPassword
            createUserWithEmailAndPassword(emailOfUser, passwordOfUser)
        }

        //Login or Sign In
        signinBtn.setOnClickListener {
            val emailOfUser: String = emailText.text.toString()
            val passwordOfUser = passwordText.text.toString()

            //function for signInWithEmailAndPassword
            signInWithEmailAndPassword(emailOfUser, passwordOfUser)

        }
    }

    //It will redirect to recordUI
    private fun updateUI(){
        Toast.makeText(this,"User already logged in", Toast.LENGTH_SHORT).show()
    }

    //Override onstart to launch recorderActivity
    public override fun onStart() {
        super.onStart()
        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = auth.currentUser
        if(currentUser != null){
            Toast.makeText(this,"User account is already created", Toast.LENGTH_SHORT).show()
            updateUI()
        }
    }

    //Create email and password
    private fun createUserWithEmailAndPassword(email :String, password : String){
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Sign in success, update UI with the signed-in user's information
                    Log.d(ContentValues.TAG, "createUserWithEmail:success")
                    val user = auth.currentUser
                    Toast.makeText(this,"User account created", Toast.LENGTH_SHORT).show()

                    updateUI()

                } else {
                    // If sign in fails, display a message to the user.
                    Log.w(ContentValues.TAG, "createUserWithEmail:failure", task.exception)
                    Toast.makeText(baseContext, "Authentication failed.",
                        Toast.LENGTH_SHORT).show()
                    Toast.makeText(this,"User account not created", Toast.LENGTH_SHORT).show()
                }
            }
    }

    //Login with email and password
    private fun signInWithEmailAndPassword(email :String, password : String){
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Sign in success, update UI with the signed-in user's information
                    Log.d(ContentValues.TAG, "signInWithEmail:success")
                    val user = auth.currentUser
                    updateUI()
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w(ContentValues.TAG, "signInWithEmail:failure", task.exception)
                    Toast.makeText(baseContext, "Authentication failed.",
                        Toast.LENGTH_SHORT).show()

                }
            }
    }
}