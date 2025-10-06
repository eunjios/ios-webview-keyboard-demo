//
//  ViewController.swift
//  KeyboardTest
//
//  Created by 이은지 on 10/6/25.
//


import UIKit
import WebKit

class ViewController: UIViewController {
    
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupWebView()
        loadWebApp()
    }
    
    func setupWebView() {
        let config = WKWebViewConfiguration()
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        webView = WKWebView(frame: self.view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.scrollView.bounces = false
        
        self.view.addSubview(webView)
    }
    
    func loadWebApp() {
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "build") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            print("Error: build/index.html not found in bundle")
        }
    }
}
