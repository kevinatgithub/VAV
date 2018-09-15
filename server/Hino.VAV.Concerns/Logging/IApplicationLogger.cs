using System;
using System.IO;
using Microsoft.Extensions.Logging;

namespace Hino.VAV.Concerns.Logging
{
    /// <summary>
    ///     Application specific logger avoid hard coding against Serilog.
    /// </summary>
    public interface IApplicationLogger
    {
        /// <summary>
        /// Determines whether the specified level is enabled.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <returns>
        ///   <c>true</c> if the specified level is enabled; otherwise, <c>false</c>.
        /// </returns>
        bool IsEnabled(LogLevel level);

        /// <summary>
        /// Changes the logging context to the configured value
        /// </summary>
        /// <param name="contextName">The name of the context that should be used</param>
        /// <param name="contextValue">The value that's used to check the context</param>
        void SetContext(string contextName, string contextValue);

        /// <summary>
        /// Changes the log level.
        /// </summary>
        /// <param name="level">The level.</param>
        void ChangeLogLevel(LogLevel level);

        /// <summary>
        /// Resets the log level to the initial value
        /// </summary>
        void ResetLogLevel();

        /// <summary>
        /// Adds a textwriter to the log pipeline.
        /// </summary>
        /// <param name="writer">The writer.</param>
        void AddLogger(TextWriter writer);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="template">The template.</param>
        /// <param name="parameter1">The parameter1.</param>
        void Error<T1>(string template, T1 parameter1);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="template">The template.</param>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Error<T1, T2>(string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Error<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Error(string template, params object[] parameters);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <param name="exception">The ex.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Error<T1>(Exception exception, string template, T1 parameter1);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <param name="exception">The ex.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Error<T1, T2>(Exception exception, string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes an error level log event based on the template and parameters.
        /// </summary>
        /// <param name="exception">The ex.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Error<T1, T2, T3>(Exception exception, string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Errors the specified ex.
        /// </summary>
        /// <param name="exception">The ex.</param>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Error(Exception exception, string template, params object[] parameters);

        /// <summary>
        /// Writes a warning level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Warning<T1>(string template, T1 parameter1);

        /// <summary>
        /// Writes a warning level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Warning<T1, T2>(string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes a warning level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Warning<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Writes a warning level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Warning(string template, params object[] parameters);

        /// <summary>
        /// Writes an information level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Information<T1>(string template, T1 parameter1);

        /// <summary>
        /// Writes an information level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Information<T1, T2>(string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes an information level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Information<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Writes an information level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Information(string template, params object[] parameters);

        /// <summary>
        /// Writes a debug level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Debug<T1>(string template, T1 parameter1);

        /// <summary>
        /// Writes a debug level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Debug<T1, T2>(string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes a debug level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Debug<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Writes a debug level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Debug(string template, params object[] parameters);

        /// <summary>
        /// Writes a trace level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Trace<T1>(string template, T1 parameter1);

        /// <summary>
        /// Writes a trace level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Trace<T1, T2>(string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes a trace level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3.</param>
        void Trace<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Writes a trace level log event based on the template and parameters.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="parameters">The parameters.</param>
        void Trace(string template, params object[] parameters);

        /// <summary>
        /// Writes log event based on the template and parameters.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="template">The template.</param>
        void Write(LogLevel level, Exception exception, string template);

        /// <summary>
        /// Writes log event based on the template and parameters.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        void Write<T1>(LogLevel level, Exception exception, string template, T1 parameter1);

        /// <summary>
        /// Writes log event based on the template and parameters.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        void Write<T1, T2>(LogLevel level, Exception exception, string template, T1 parameter1, T2 parameter2);

        /// <summary>
        /// Writes log event based on the template and parameters.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="template">The template.</param>
        /// <typeparam name="T1">The type of object for the first parameter</typeparam>
        /// <typeparam name="T2">The type of object for the second parameter</typeparam>
        /// <typeparam name="T3">The type of object for the third parameter</typeparam>
        /// <param name="parameter1">The parameter1.</param>
        /// <param name="parameter2">The parameter2.</param>
        /// <param name="parameter3">The parameter3</param>
        void Write<T1, T2, T3>(LogLevel level, Exception exception, string template, T1 parameter1, T2 parameter2, T3 parameter3);

        /// <summary>
        /// Adds additional information to the log context
        /// </summary>
        /// <param name="propertyName">Name of the property.</param>
        /// <param name="value">The value.</param>
        /// <returns>An application logger extended with a new property and value</returns>
        IApplicationLogger With(string propertyName, object value);
    }
}